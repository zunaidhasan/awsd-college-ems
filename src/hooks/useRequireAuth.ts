"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUser, getSessionUser, getUserHomeRoute, isAuthorized, UserRole } from "../lib/auth";

export const useRequireAuth = (allowedRoles: UserRole | UserRole[]) => {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const currentUser = getSessionUser();
    if (!currentUser) {
      router.replace("/login");
      return;
    }

    if (!isAuthorized(currentUser.role, allowedRoles)) {
      router.replace(getUserHomeRoute(currentUser.role));
      return;
    }

    setUser(currentUser);
    setReady(true);
  }, [allowedRoles, router]);

  return { user, ready };
};
