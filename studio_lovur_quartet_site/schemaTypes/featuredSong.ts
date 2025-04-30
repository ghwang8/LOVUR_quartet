import { defineType } from "sanity";

export default defineType({
  name: "featuredSong",
  title: "Featured Song",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Song Title",
      type: "string",
    },
    {
      name: "subheading",
      title: "Subheading",
      type: "string",
    },
    {
      name: "caption",
      title: "Caption",
      type: "text",
    },
    {
      name: "spotifyLink",
      title: "Spotify Link",
      type: "url",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
});
