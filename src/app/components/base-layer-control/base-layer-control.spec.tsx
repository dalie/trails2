import { render } from "@testing-library/react";

import BaseLayerControl from "./base-layer-control";

describe("BaseLayerControl", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<BaseLayerControl />);
    expect(baseElement).toBeTruthy();
  });
});
