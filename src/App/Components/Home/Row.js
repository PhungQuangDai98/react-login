import React from "react";

const Row = ({ index, codeCountry, nameCountry }) => {
    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{codeCountry}</td>
            <td>{nameCountry}</td>
        </tr>
    );
};

export default Row;
