import styled from 'styled-components';

export const columns = [
    {
        name: 'ServiceName',
        selector: (row: { ServiceName: any; }) => row.ServiceName,
        grow: 2,
        reorder: true,
        sortable: true,

    },
    {
        name: 'ResourceLocation',
        selector: (row: { ResourceLocation: any; }) => row.ResourceLocation,
        sortable: true,

    },

    {
        name: 'MeterCategory',
        selector: (row: { MeterCategory: any; }) => row.MeterCategory,
        sortable: true,

    }, {
        name: 'Location',
        selector: (row: { Location: any; }) => row.Location,
        sortable: true,

    }, {
        name: 'Date',
        selector: (row: { Date: any; }) => row.Date,
        sortable: true,
    }, {
        name: 'UnitOfMeasure',
        selector: (row: { UnitOfMeasure: any; }) => row.UnitOfMeasure,
        sortable: true,

    }, {
        name: 'Cost',
        selector: (row: { Cost: any; }) => row.Cost,
        sortable: true,

    }, {
        name: 'ConsumedQuantity',
        selector: (row: { ConsumedQuantity: any; }) => row.ConsumedQuantity,
        sortable: true,

    },
    , {
        name: 'InstanceId',
        selector: (row: { InstanceId: any; }) => row.InstanceId,
        sortable: true,

    },
];

export const TextField = styled.input`
height: 32px;
width: 200px;
border-radius: 3px;
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;
border-top-right-radius: 0;
border-bottom-right-radius: 0;
border: 1px solid #e5e5e5;
padding: 0 32px 0 16px;    
&:hover {
    cursor: pointer;
}
`;

export const ClearButton = styled.button<{ $primary?: boolean; }>`
border-top-left-radius: 0;
border-bottom-left-radius: 0;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;
height: 34px;
width: 32px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
`;
export interface ApplicationOption {
    readonly value: string;
    readonly label: string;
}
export interface ApplicationList {
    ConsumedQuantity: string;
    Cost: string;
    Date: string;
    InstanceId: string;
    Location: string;
    MeterCategory: string;
    ResourceGroup: string;
    ResourceLocation: string;
    ServiceName: string;
    Tags: string;
    UnitOfMeasure: string;
}
export interface TabState {
    application: boolean;
    resources: boolean;
  }
export const InActiveClass = 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300';
export const ActiveClass = 'inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500';