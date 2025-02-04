import type { Meta, StoryObj } from "@storybook/react";

import Movie from "../components/Movie";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Movie> = {
  title: "Movie",
  component: Movie,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Loaded: Story = {
  args: {
    loading: false,
    id: 1,
    title: "Nosferatu",
    overview:
      "A gothic tale of obsession between a haunted young woman and the terrifying vampire infatuated with her, causing untold horror in its wake.",
    poster_path: "/5qGIxdEO841C0tdY8vOdLoRVrr0.jpg",
    release_date: "2024-11-21",
    vote_average: 0,
  },
};
