"use client";

import { logout } from "@/features/auth/actions/actions";

import Button from "@/components/UI/button/button";

export default function LogoutButton() {
  async function handleLogout() {
    await logout();
  }

  return (
    <>
      <Button onClick={handleLogout} type="button">
        Log Out
      </Button>
    </>
  );
}
