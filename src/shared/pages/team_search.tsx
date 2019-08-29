import React, { } from 'react';
// import Select from "react-select";
// import axios from "axios";
//import config from "../../config";


// const options = {
//     headers: config.headers
// };

// interface teamsResponse {
//     data: team[];
// }

// interface team {
//     displayName: string;
//     type: string
// }

const TeamSearch : React.FC = () => {

// const [,setTeams] = useState <team[]>([]);
// const [selectedOption] = useState(null);
// const [selectedTeam, setSelectedTeam] = useState(null);
// const [teamUUID, setTeamUUID] = useState(null);


    const getTeams = () => {
        // axios.get(config.config.INFO_SERVICE + 'team', options)
        //     .then((res: teamsResponse) => {
        //     setTeams(res.data)
        // })
    };
    //
    // function getTeam = (teamUUID: string) => {
    //     axios({
    //         method: 'GET',
    //         url: config.config.INFO_SERVICE + 'team/' + teamUUID,
    //         options
    //         //auth: config.config.WORKFLOW_BASIC_AUTH
    //         // @ts-ignore
    //     }).then(res => {
    //         setSelectedTeam({
    //             selectedTeam: res.data
    //         })
    //     })
    // };
    //
    // // @ts-ignore
    // handleChange = (selectedOption) => {
    //     this.setState(
    //         {
    //             selectedOption,
    //             teamUUID: selectedOption.value
    //         });
    //     console.log(`Option selected:`, selectedOption);
    // };

    // @ts-ignore
    // displayTeamTable = ( selectedTeam ) => (
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

            {/*<Select*/}
            {/*    value={selectedOption}*/}
            {/*    // onChange={this.handleChange}*/}
            {/*    options={teams.map(team => ({label: team.displayName, value: team.type}))}*/}
            {/*    className= 'typeahead-input'*/}
            {/*/>*/}
            {/*<button type="submit" className="govuk-button find-user-button" onClick={() => this.getTeam(teamUUID)}>Find team</button>*/}
            {/*{this.displayTeamTable(selectedTeam, teamUUID)}*/}

            <button className="govuk-button find-user-button" onClick={() => getTeams()}>Find team</button>

        </div>
    );
};

export default TeamSearch;
// import React, { Fragment } from 'react';
//
// const TeamSearch : React.FC = () => (
//     <Fragment>
//         <div className="govuk-grid-column-two-thirds">
//             <ul className="govuk-list">
//                 <li>
//                     <a className="govuk-link" href="/">Team search</a>
//                 </li>
//             </ul>
//         </div>
//     </Fragment>
// );
//
// export default TeamSearch;
