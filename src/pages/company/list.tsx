import CustomAvatar from '@/components/custom-avatar';
import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { SearchOutlined } from '@ant-design/icons';
import { CreateButton, EditButton, DeleteButton, FilterDropdown, List, useTable } from '@refinedev/antd'
import { getDefaultFilter, type HttpError, useGo } from '@refinedev/core';
import { Input, Space, Table } from 'antd';
import { Text } from '../../components/text'
import React from 'react'
import { Company } from '@/graphql/schema.types';
import { currencyNumber } from '@/utilities';

export const CompanyList = ({ children }: React.PropsWithChildren) => {

  const go = useGo();

  const { tableProps, filters } = useTable<Company, HttpError, Company>({
    resource: "companies",
    onSearch: (values) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values.name,
        },
      ];
    },
    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
    },
    filters: {
      initial: [
        {
          field: "name",
          operator: "contains",
          value: undefined,
        },
      ],
    },
    pagination: {
      pageSize: 12,
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });


  return (
    <div>
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton 
          onClick={() => {
            go({
              to: {
                resource: 'companies',
                action: 'create'
              },
              options: {
                keepQuery: true
              },
              type: 'replace'
            })
          }}
        />
      )}
    >

      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
        }}
      >
        <Table.Column<Company>
          dataIndex="name"
          title="Company Title"
          defaultFilteredValue={getDefaultFilter('id', filters)}  
          // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Company" />
            </FilterDropdown>
          )}
          render={(_, record) => (
            
              <Space>
                <CustomAvatar 
                  shape='square'  
                  name={record.name}
                  src={record.avatarUrl}
                />

                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.name}
                </Text>

              </Space>
            )}
        />

        <Table.Column<Company> 
          dataIndex="totalRevenue"
          title="Open deals amount"
          render={(value, company) => (
            <Text>
              {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
            </Text>
          )}
        />

        <Table.Column<Company> 
          dataIndex="id"
          title="Actions"
          fixed="right"
          render={(value) => (
            <Space>
              <EditButton hideText size="small" recordItemId={value}/>
              <DeleteButton hideText size="small" recordItemId={value}/>
            </Space>
          )}
        />


      </Table>
        
    </List>
    {children}
    </div>
  )
}

