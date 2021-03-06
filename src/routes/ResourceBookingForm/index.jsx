/**
 * ResourceBookingEdit
 *
 * Page for edit resource booking details.
 * It gets `teamId` and `resourceBookingId` from the router.
 */
import React, { useState, useEffect } from "react";
import PT from "prop-types";
import { toastr } from "react-redux-toastr";
import Page from "../../components/Page";
import PageHeader from "../../components/PageHeader";
import { useData } from "hooks/useData";
import {
  getReourceBookingById,
  updateReourceBooking,
} from "services/resourceBookings";
import { getPositionDetails } from "services/teams";
import LoadingIndicator from "../../components/LoadingIndicator";
import withAuthentication from "../../hoc/withAuthentication";
import TCForm from "../../components/TCForm";
import { getEditResourceBookingConfig } from "./utils";
import "./styles.module.scss";

const ResourceBookingDetails = ({ teamId, resourceBookingId }) => {
  const [submitting, setSubmitting] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [rb, loadingError] = useData(getReourceBookingById, resourceBookingId);

  useEffect(() => {
    if (!!rb) {
      setJobId(rb.jobId);
    }
  }, [rb]);

  useEffect(() => {
    if (jobId) {
      getPositionDetails(teamId, jobId).then((response) => {
        const candidate = response.data.candidates?.find(
          (x) => x.userId === rb.userId
        );
        const data = {
          title: response.data.title,
          ...candidate,
          ...rb,
        };
        setFormData(data);
      });
    }
  }, [jobId, rb, teamId]);

  const onSubmit = async (values) => {
    const data = getRequestData(values);
    await updateReourceBooking(data, resourceBookingId).then(
      () => {
        toastr.success("Resource Booking updated successfully.");
        setSubmitting(false);
        window.history.pushState({}, null, `/taas/myteams/${teamId}`);
      },
      (err) => {
        setSubmitting(false);
        toastr.error(err.message);
      }
    );
  };

  const getRequestData = (values) => {
    return {
      projectId: values.projectId,
      startDate: values.startDate,
      endDate: values.endDate,
      memberRate: values.memberRate,
      customerRate: values.customerRate,
      status: values.status,
      userId: values.userId,
      rateType: values.rateType,
    };
  };

  return (
    <Page title="Edit Member Details">
      {!formData ? (
        <LoadingIndicator error={loadingError} />
      ) : (
        <>
          <PageHeader
            title="Edit Member Details"
            backTo={`/taas/myteams/${teamId}/rb/${rb.id}`}
          />
          <div styleName="rb-modification-details">
            <TCForm
              configuration={getEditResourceBookingConfig(onSubmit)}
              initialValue={formData}
              submitButton={{ text: "Save" }}
              backButton={{ text: "Cancel", backTo: `/taas/myteams/${teamId}` }}
              submitting={submitting}
              setSubmitting={setSubmitting}
            />
          </div>
        </>
      )}
    </Page>
  );
};

ResourceBookingDetails.propTypes = {
  teamId: PT.string,
  resourceBookingId: PT.string,
};

export default withAuthentication(ResourceBookingDetails);
