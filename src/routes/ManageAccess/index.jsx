/**
 * ManageAccess
 *
 * Page for the list of teams.
 */
import React from "react";
import {
  createHistory,
  LocationProvider
} from "@reach/router"
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import { useData } from "hooks/useData";
import { useQuery } from "hooks/useQuery";
import { getTeamMembers } from "../../services/teams";
import LoadingIndicator from "../../components/LoadingIndicator";
import withAuthentication from "../../hoc/withAuthentication";
import "./styles.module.scss";
import Members from "./Members";

const ManageAccess = ({ teamId }) => {
  let history = createHistory(window);
  const [members, loadingError] = useData(getTeamMembers, teamId);
  const fromDetails = useQuery("details");

  return (
    <LocationProvider history={history}>
      <Page title="Manage Access">
        <PageHeader title="Manage Access" backTo={
          fromDetails ? `/taas/myteams/${teamId}` : "/taas/myteams"
        } />
        {members && members.length === 0 && (
          <div>No members found</div>
        )}

        {!members ? (
          <LoadingIndicator error={loadingError} />
        ) :
          <Members members={members} teamId={teamId} />
        }
      </Page>
    </LocationProvider>
  );
};

export default withAuthentication(ManageAccess);
