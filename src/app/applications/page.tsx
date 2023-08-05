"use client"
import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { TabState, InActiveClass, ActiveClass, ApplicationOption, columns, TextField, ClearButton, ApplicationList } from './types';
import useFetchData, { ShowLoader, API_URL } from '@/lib';
import Link from 'next/link';
function page() {
    const [applications, setApplications] = useState<ApplicationOption[]>([]);
    const [applicationList, setApplicationList] = useState<ApplicationList[]>([]);
    const [saveData, setSaveData] = useState<ApplicationList[]>([]);
    const [isLoader, setIsLoader] = useState<Boolean>(false);
    const [filterText, setFilterText] = useState<String>('');
    const [tab, setTab] = useState<TabState>({ application: true, resources: false });
    const [tabName, setTabName] = useState<string>('applications');
    const handleTab = (activeTab: string) => {
        setApplicationList([]);
        setSaveData([]);
        setApplications([]);
        setFilterText('');

        if (activeTab == 'application') {
            setTabName('applications');
            setTab({ application: true, resources: false });
        } else {
            setTab({ application: false, resources: true });
            setTabName('resources');
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoader(true);
                const dataList = await useFetchData(`${API_URL}/${tabName}`);
                const dataFetch = dataList.map((data: string) => ({
                    label: data,
                    value: data,
                }));
                setApplications(dataFetch);
                setIsLoader(false);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [tabName]);

    const handleChange = async (selectedOption: any) => {
        setIsLoader(true);
        const dataList = await useFetchData(`${API_URL}/${tabName}/${selectedOption.value}`);
        setApplicationList(dataList);
        setSaveData(dataList);
        setIsLoader(false);

    };
    const FilterComponent: React.FC<{
        filterText: string;
        onFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
        onClear: () => void;
    }> = ({ filterText, onFilter, onClear }) => {
        const inputRef = useRef<HTMLInputElement>(null); // Set appropriate type for inputRef

        useEffect(() => {
            if (filterText) {
                inputRef.current?.focus();
                const filteredItems = applicationList && applicationList.filter(
                    (item: ApplicationList) => item.ServiceName && item.ServiceName.toLowerCase().includes(filterText.toLowerCase()),
                )
                setApplicationList(filteredItems);
            }

        }, [filterText])
        return <>
            <TextField
                ref={inputRef}
                id="search"
                type="text"
                placeholder="Filter By Service Name"
                aria-label="Search Input"
                value={filterText}
                onChange={onFilter}
            />
            <ClearButton type="button" onClick={onClear}>
                X
            </ClearButton>
        </>
    };

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setFilterText('');
                setApplicationList(saveData);
            }
        };
        return (
            <FilterComponent onFilter={(e: any) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText]);

    return (
        <>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mr-2">
                    <Link
                        href="#"
                        aria-current={tab.application ? 'page' : false}
                        onClick={() => handleTab('application')}
                        className={tab.application ? ActiveClass : InActiveClass}
                    >
                        Applications
                    </Link>
                </li>
                <li className="mr-2">
                    <Link
                        href="#"
                        aria-current={tab.resources ? 'page' : false}
                        onClick={() => handleTab('resouses')}
                        className={tab.resources ? ActiveClass : InActiveClass}
                    >
                        Resources
                    </Link>
                </li>
            </ul>

            {applications && applications.length > 0 && <Select<ApplicationOption>
                defaultValue={{ label: 'Select Option', value: 'Select Option' }}
                onChange={handleChange}
                options={applications}
            />
            }
            {isLoader && <ShowLoader />}
            {(!isLoader && applicationList && applicationList.length > 0) &&
                <DataTable
                    title={`${tabName.charAt(0).toUpperCase()
                        + tabName.slice(1)} List`}
                    columns={columns}
                    data={applicationList}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    selectableRows
                    persistTableHead
                />
            }
        </>

    )
}

export default page;
