import React, { useEffect, useState } from "react";
import { postWithAuthentication } from "../../API/AxiosService";
import Row from "./Row";
function Home() {
    const [countryList, setCountryList] = useState([]);
    useEffect(() => {
        let data = {
            page: 1,
            pageSize: 20,
            sortExpression: "Id asc",
            predicate: {
                dynamicPredicate: {
                    path: "",
                    value: "",
                    caseSensitive: false,
                    condition: 0,
                    children: [],
                    childrenUnionOperator: 0,
                    parentChildUnionOperator: 0,
                },
            },
        };
        postWithAuthentication("/DMQuocGia/GetAllCountries", data)
            .then((response) => {
                setCountryList(response.data.Items);
            })
            .catch((err) => {
                console.log(err + "");
            });
    }, []);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Code</th>
                    <th scope="col">Name Country</th>
                </tr>
            </thead>
            <tbody>
                {countryList.map((country, index) => {
                    return (
                        <Row
                            key={index}
                            index={index}
                            codeCountry={country.Id}
                            nameCountry={country.tenNuoc}
                        />
                    );
                })}
            </tbody>
        </table>
    );
}
export default Home;
