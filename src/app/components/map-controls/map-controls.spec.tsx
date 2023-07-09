import { render } from "@testing-library/react";

import MapControls from "./map-controls";

describe("MapControls", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MapControls />);
    expect(baseElement).toBeTruthy();
  });
});
