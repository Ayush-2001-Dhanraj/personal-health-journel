import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fab, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import BiotechIcon from "@mui/icons-material/Biotech";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Entry from "../components/Entry";
import AddEntryModal from "../components/AddEntry";
import ViewEntryModel from "../components/ViewEntry";
import { resetSelectedEntry, setSelectedEntry } from "../redux/entriesSlice";
import {
  closeAddModel,
  closeAttachmentModel,
  closeViewModel,
  openAddModel,
  openViewModel,
} from "../redux/globalSlice";
import AttachmentPreview from "../components/AttachmentPreview";
import dayjs from "dayjs";

function Dashboard() {
  const { entries } = useSelector((state) => state.entries);

  const theme = useTheme();

  const dispatch = useDispatch();

  const { isAddModelOpen, isViewModelOpen, isAttachmentModelOpen } =
    useSelector((state) => state.global);
  const handleAddOpen = () => dispatch(openAddModel());
  const handleAddClose = () => dispatch(closeAddModel());

  const handleViewOpen = () => dispatch(openViewModel());
  const handleViewClose = () => {
    dispatch(resetSelectedEntry());
    dispatch(closeViewModel());
  };

  const handleAttachmentClose = () => dispatch(closeAttachmentModel());

  const handleEntryClick = (r) => {
    dispatch(setSelectedEntry(r._id));
    handleViewOpen();
  };

  return (
    <Box>
      {/* Add Entry Btn */}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Fab size="small" color="primary" onClick={handleAddOpen}>
          <AddIcon />
        </Fab>
      </Box>
      {/* Timeline */}
      <VerticalTimeline>
        {entries &&
          entries.map((e) => (
            <VerticalTimelineElement
              key={e._id}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: theme.palette.primary.main,
              }}
              contentArrowStyle={{
                borderRight: `7px solid  ${theme.palette.primary.main}`,
              }}
              date={dayjs(e.eventDate).format("LL")}
              iconStyle={{
                background: theme.palette.background.default,
                color: theme.palette.primary.main,
              }}
              icon={e.type === "GEN" ? <ReceiptIcon /> : <BiotechIcon />}
            >
              <Entry r={e} onClick={handleEntryClick} />
            </VerticalTimelineElement>
          ))}
      </VerticalTimeline>

      {/* models */}
      {isAddModelOpen && (
        <AddEntryModal open={isAddModelOpen} handleClose={handleAddClose} />
      )}
      {isViewModelOpen && (
        <ViewEntryModel open={isViewModelOpen} handleClose={handleViewClose} />
      )}
      {isAttachmentModelOpen && (
        <AttachmentPreview
          open={isAttachmentModelOpen}
          handleClose={handleAttachmentClose}
        />
      )}
    </Box>
  );
}

export default Dashboard;
