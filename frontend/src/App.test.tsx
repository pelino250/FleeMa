import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import App from "./App";
import { useAuthStore } from "./store/authStore";
import type { User } from "./types";

const testUser: User = {
  id: 1,
  email: "a@b.com",
  first_name: "A",
  last_name: "B",
  role: "tenant_admin",
  tenant: { id: 1, name: "T", subdomain: "t" },
};

describe("App routing", () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, loading: false, error: null });
  });

  it("redirects unauthenticated user to login", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("shows login form at /login", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("shows register form at /register", () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "Create Account" })).toBeInTheDocument();
  });

  it("authenticated user sees dashboard", () => {
    useAuthStore.setState({ user: testUser });
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Dashboard/)).toBeInTheDocument();
  });

  it("authenticated user at /login is redirected to dashboard", () => {
    useAuthStore.setState({ user: testUser });
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Dashboard/)).toBeInTheDocument();
  });

  it("authenticated user sees profile page", () => {
    useAuthStore.setState({ user: testUser });
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText("A B")).toBeInTheDocument();
    expect(screen.getByText("a@b.com")).toBeInTheDocument();
    expect(screen.getByText("tenant_admin")).toBeInTheDocument();
  });
});
