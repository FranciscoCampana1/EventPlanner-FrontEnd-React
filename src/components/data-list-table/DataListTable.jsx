import React from "react";
import { TablePagination } from "../../components";
import { Table } from "react-bootstrap";

export default function DataListTable({
  data,
  title = "Data",
  headers,
  attributes,
  onChange,
  className,
  pagination = null,
}) {
  return (
    <div className={className}>
      <Table bgcolor="white">
        <thead>
          <tr colSpan={headers.length}>
            <th>
              <div className="tableTitle"> {title}</div>
            </th>
          </tr>
          <tr>
            {headers.map((th, index) => (
              <th key={index}>{th}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((d) => (
            <tr scope="row" data-data-id={d.id} onClick={onChange} key={d.id}>
              {attributes.map((attr, index) => (
                <td data-label={headers[index]} key={index}>
                  {d[attr] ? d[attr] : "No definido"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {pagination && (
          <tfoot>
            <tr>
              <td colSpan={headers.length}>
                <TablePagination
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                  count={pagination.count}
                  limit={data.length}
                  onChange={onChange}
                />
              </td>
            </tr>
          </tfoot>
        )}
      </Table>
    </div>
  );
}
