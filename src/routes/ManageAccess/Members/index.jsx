import React from "react";
import User from "components/User";
import CardHeader from "components/CardHeader";
import PT from "prop-types";

import "./styles.module.scss";

const Members = ({ members, teamId }) => {
  return (
    <div styleName="team-members">
      <CardHeader title="PROJECT ACCESS" />

      {members.length === 0 && <div styleName="no-members">No members found</div>}
      {members.length > 0 && (
        <div styleName="table">
          {members.map((member) => (
            <div styleName="table-row" key={member.id}>
              <div styleName="table-group-first">
                <div styleName="table-cell cell-user">
                  <User
                    user={{
                      ...member,
                      photoUrl: member.photoURL,
                    }}
                    handleLinkTo={`/taas/myteams/${teamId}/rb/${member.id}`}
                  />
                </div>
                {/* <div styleName="table-group-first-inner">
                  <div styleName="table-cell cell-role">{member.job.title}</div>
                  <div styleName="table-cell cell-date">
                    {formatDateRange(member.startDate, member.endDate)}
                  </div>
                  <div styleName="table-cell cell-money">
                    {member.customerRate && member.customerRate > 0
                      ? formatMoney(member.customerRate)
                      : ""}
                  </div>
                </div> */}
              </div>
              {/* <div styleName="table-group-second">
                <div styleName="table-cell cell-skills">
                  <SkillsSummary
                    skills={member.skills}
                    requiredSkills={member.job.skills}
                  />
                </div>  
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Members.propTypes = {
  members: PT.arrayOf(
    PT.shape({
      id: PT.string,
      handle: PT.string,
      firstName: PT.string,
      lastName: PT.string,
    })
  ),
  teamId: PT.number,
};

export default Members;