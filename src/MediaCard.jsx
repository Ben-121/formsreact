import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const cardStyle = {
  height: "100%", 
  display: "flex",
  flexDirection: "column",
};

const cardActionsStyle = {
  display: "flex",
  justifyContent: "flex-end", 
  alignItems: "flex-end",
  marginTop: "auto", 
  paddingTop: "8px", 
};

export default function MediaCard({ imageUrl, title, description, link }) {
  return (
    <Card sx={{ maxWidth: 345, marginTop: 5, ...cardStyle }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imageUrl} 
        title={title} 
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            lineHeight: "1.2",
            maxHeight: "calc(1.2 * 4 * 1.2em)", // Limit to 4 lines
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 4, // Limit to 4 lines for webkit browsers
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={cardActionsStyle}>
        <Button
          size="small"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
