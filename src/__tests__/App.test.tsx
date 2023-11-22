import { render, waitFor } from "../test-utils-default";
import App from "../App";

interface LocationState {
  setup: { setupComplete: boolean };
}

const mockedLocation: LocationState = {
  setup: { setupComplete: false }
};

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: (): ((path: string, state?: LocationState) => void) => mockedNavigate,
  useLocation: (): LocationState => mockedLocation
}));

test("redirect to login", async () => {
  render(<App />);

  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalled();
  });

  expect(mockedNavigate).toHaveBeenCalledWith("/login", expect.anything());
});
