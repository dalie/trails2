import { render } from "@testing-library/react";

import TrackLayersControl from "./track-layers-control";

describe("TrackLayersControl", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TrackLayersControl />);
    expect(baseElement).toBeTruthy();
  });
});
