import {
  DeleteOutlined,
  InsertDriveFileOutlined,
  MailOutlined,
  Photo,
  SendOutlined,
  StarOutline,
  
} from "@mui/icons-material";
import LabelImportantTwoToneIcon from '@mui/icons-material/LabelImportantTwoTone';

export const SIDEBAR_DATA = [
  {
    name: "inbox",
    title: "Inbox",
    icon: Photo,
  },
  {
    name: "starred",
    title: "Starred",
    icon: StarOutline,
  },
  {
    name: "important",
    title: "Important",
    icon: LabelImportantTwoToneIcon,
  },
  {
    name: "sent",
    title: "Sent",
    icon: SendOutlined,
  },
  {
    name: "drafts",
    title: "Drafts",
    icon: InsertDriveFileOutlined,
  },
  {
    name: "bin",
    title: "Bin",
    icon: DeleteOutlined,
  },
  {
    name: "allmail",
    title: "All mail",
    icon: MailOutlined,
  },
];
