/**
 * TeamSummary
 *
 * Shows team summary like: time remaining, rating, weekly cost and "report an issue" button.
 */
import React from "react";
import PT from "prop-types";
import DataItem from "components/DataItem";
import {
  formatConnectProjectUrl,
  formatMoney,
  formatRemainingTimeForTeam,
  formatReportIssueUrl,
} from "utils/format";
import IconClock from "../../../../assets/images/icon-clock.svg";
import IconMoney from "../../../../assets/images/icon-money.svg";
// import IconRating from "../../../../assets/images/icon-rating.svg";
import Button from "components/Button";
// import Rating from "components/Rating";
import "./styles.module.scss";

const TeamSummary = ({ team }) => {
  return (
    <div styleName="team-summary">
      <div styleName="data-items">
        <DataItem title="Time Remaining" icon={<IconClock />}>
          {formatRemainingTimeForTeam(team)}
        </DataItem>

        {!!(team.weeklyCost && team.weeklyCost > 0) && (
          <DataItem title="Weekly Cost" icon={<IconMoney />}>
            {formatMoney(team.weeklyCost)}
          </DataItem>
        )}

        {/* Hide Rating for now as per https://github.com/topcoder-platform/taas-app/issues/18 */}
        {/* <DataItem title="Overall Rating" icon={<IconRating />}>
          <Rating value={team.rating} />
        </DataItem> */}
      </div>

      <div styleName="actions">
        <Button
          href={formatConnectProjectUrl(team.id)}
          target="_blank"
          type="secondary"
          size="medium"
        >
          Open in Connect
        </Button>
        <Button
          type="warning"
          size="medium"
          href={formatReportIssueUrl(`TaaS Issue: ${team.name}`)}
          target="_blank"
        >
          REPORT AN ISSUE
        </Button>
      </div>
    </div>
  );
};

TeamSummary.propTypes = {
  team: PT.shape({
    name: PT.string,
    endDate: PT.string,
    weeklyCost: PT.number,
    rating: PT.number,
  }),
};

export default TeamSummary;
