import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "../../test-utils-blank";
import "@testing-library/jest-dom";
import LoginComponent from "../../pages/login";
import { act } from "@testing-library/react";

const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: (): any => mockedNavigator
}));

test("loads and display the form", async () => {
  // ARRANGE
  render(<LoginComponent />);

  // ACT
  await screen.findByRole("button", { name: "Login" });

  // ASSERT
  expect(screen.getByAltText("Minebea Logo")).toBeInTheDocument();
  expect(screen.getByLabelText("User")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
});

it("submits username and password and login successfully!", async () => {
  // CONFIGURE
  const username = "me";
  const password = "please";
  const mock = jest.spyOn(global, "fetch").mockImplementation(
    jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            result: {
              id: null,
              username: null,
              email: null,
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e...mTEfamDmytHd_dudfioSMQGjnye9t4wch3QfA",
              roles: null,
              availableRoles: null
            },
            totalResultCount: 0,
            statusCode: 200,
            errors: null
          })
      })
    ) as jest.Mock
  );

  render(<LoginComponent />);
  
  await screen.findByRole("button", { name: "Login" });

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    userEvent.type(screen.getByLabelText(/User/i), username);
    userEvent.type(screen.getByLabelText(/Password/i), password);
    userEvent.click(screen.getByText(/login/i));
  });
  
  
  // ASSERT
  await waitFor(() => {
    expect(mockedNavigator).toHaveBeenCalled();
  });
  
  expect(mockedNavigator).toBeCalledWith("/");

  expect(mock).toBeCalledWith(
    "/api/Auth/login",
    expect.objectContaining({
      body: '{"username":"me","password":"please"}'
    })
  );

  //CLEANUP
  mock.mockRestore();
});


it("submits username and password and login fails with error message!", async () => {
  // ARRANGE
  jest.spyOn(global, "fetch").mockImplementation(jest.fn()) as jest.Mock;
  render(<LoginComponent />);

  await screen.findByRole("button", { name: "Login" });

  // ACT
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(screen.getByLabelText(/User/i), "hufoi");
    userEvent.type(screen.getByLabelText(/Password/i), "zguih");
    userEvent.click(screen.getByText(/login/i));
  });

  // ASSERT
  await waitFor(() => {
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});

it("User control is invalid if empty", async () => {
  // ARRANGE
  render(<LoginComponent />);
  await screen.findByRole("button", { name: "Login" });

  // ACT
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    userEvent.type(screen.getByLabelText(/Password/i), "zguih");
  });

  const usernameInput = screen.getByLabelText("User");

  // ASSERT
  expect(usernameInput).toBeInvalid();
});
