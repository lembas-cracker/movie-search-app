import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { useArgs } from "@storybook/preview-api";

import PaginationWrapper from "./PaginationWrapper";
import Pagination from "../components/Pagination";

const meta: Meta<typeof PaginationWrapper> = {
  title: "Pagination",
  component: PaginationWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    moviesPerPage: 6,
    totalMovies: 30,
    onPageChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NextPage: Story = {
  args: {
    currentPage: 1,
  },
  render: (args) => {
    // Use the useArgs hook to manage state
    const [, updateArgs] = useArgs();

    const handlePageChange = (pageNumber: number) => {
      // Update the currentPage in Storybook's args
      updateArgs({ currentPage: pageNumber });
      // Call the onPageChange mock function
      args.onPageChange(pageNumber);
    };

    return (
      <Pagination
        {...args}
        onPageChange={handlePageChange} // Pass the state updater
      />
    );
  },

  play: async (context) => {
    const canvas = within(context.canvasElement);
    const nextButton = canvas.getByRole("button", { name: "2" });
    await userEvent.click(nextButton);

    expect(context.args.onPageChange).toHaveBeenCalledWith(2);
    expect(nextButton).toHaveClass("active");
  },
};
