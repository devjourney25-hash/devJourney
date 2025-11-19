import { auth } from "@clerk/nextjs/server";

export const getIsAdmin = async () => {
  try {
    const { userId } = await auth();
    
    // If no user is logged in, return false
    if (!userId) return false;
    
    const adminIds = process.env.CLERK_ADMIN_IDS?.split(", ") || [];
    return adminIds.includes(userId);
  } catch (error) {
    // If there's any error with auth, assume not admin
    console.error("Error checking admin status:", error);
    return false;
  }
};

// Alternative function to get admin status without auth (for client-side)
export const checkIsAdminClient = (userId: string | null) => {
  if (!userId) return false;
  const adminIds = process.env.NEXT_PUBLIC_CLERK_ADMIN_IDS?.split(", ") || [];
  return adminIds.includes(userId);
};