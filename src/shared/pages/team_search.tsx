import React from 'react';
import TypeAhead from '../common/components/type-ahead';

//import Select from 'react-select';
//import axios from 'axios';

// interface teamsResponse {
//     data: team[];
// }

// interface team {
//     displayName: string;
//     type: string
// }

const TeamSearch : React.FC = () => {

    // const [, setTeams] = useState<team[]>([]);
// const [selectedOption, setSelectedOption] = useState(null);
// const [selectedTeam, setSelectedTeam] = useState(null);
// const [teamUUID, setTeamUUID] = useState(null);

    // useEffect(() => {
    //     console.log('UseEffect `Called');
    //     axios.get('api/team')
    //         .then((res: teamsResponse) => {
    //             setTeams(res.data);
    //         });
    // }, []);

    // @ts-ignore
    // const displayTeamTable = ( selectedTeam, teamUUID ) => (
    //     <div>
    //         <div>
    //         </div>
    //         <div>
    //             {selectedTeam && (
    //                 <table className="govuk-table">
    //                     <thead className="govuk-table__head">
    //                     <tr className="govuk-table__row">
    //                         <th className="govuk-table__header" scope="col">Team</th>
    //                         <th className="govuk-table__header" scope="col">Actions</th>
    //                     </tr>
    //                     </thead>
    //                     <tbody className="govuk-table__body">
    //                     <tr className="govuk-table__row" key={selectedTeam.type}>
    //                         <td className="govuk-table__cell" key={selectedTeam.displayName}>{selectedTeam.displayName}</td>
    //                         <td className="govuk-table__cell"><a href={"/team/" + selectedTeam.type}>View</a></td>
    //                     </tr>
    //                     </tbody>
    //                 </table>
    //             )}
    //         </div>
    //     </div>
    // );

    
    return (
            <div className="govuk-grid-column-two-thirds">
                <h1 className="govuk-heading-xl">
                    Team search
                </h1>

                 <SelectBox />

                <button type="submit" className="govuk-button find-user-button">Find team</button>
                {/*<button type="submit" className="govuk-button find-user-button" onClick={() => getTeam(teamUUID)}>Find team</button>*/}
                {/*{displayTeamTable(selectedTeam, teamUUID)}*/}
                {/*<button className="govuk-button find-user-button" onClick={() => getTeam(teamUUID)}>Find team</button>*/}

            </div>
    );
};

const SelectBox = ({ }) => {

    // const options = [
    //     {value: 'chocolate', label: 'Chocolate'},
    //     {value: 'strawberry', label: 'Strawberry'},
    //     {value: 'vanilla', label: 'Vanilla'},
    // ];

    return (
        <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="sort">
                Sort by
            </label>
            {/*{teams.map((teams: any) => {*/}
            {/*    console.log(teams.value)*/}
            {/*})*/}
            {/*}*/}
            <TypeAhead
                choices={[]}
                clearable={true}
                disabled={true}
                label={'testlabel'}
                name={'testname'}
                updateState={(newValue) => { console.log(newValue); }}
                value={'testvalue'}
            ></TypeAhead>
        </div>
    );
};

export default TeamSearch;
