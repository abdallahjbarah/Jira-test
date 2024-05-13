import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@components/layout/Loader";
import { getUserSession } from "@utils/methods";

const CustomAuthProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const userData = getUserSession();

      const studentPaths = ["/student", "/sign-up/student"];
      const teacherPaths = ["/teacher", "/sign-up/teacher"];
      const allowedPublicPaths = [
        "/",
        "/become-a-tutor",
        "/course-page",
        "/courses",
        "/email-reset-password",
        "/email-verification",
        "/find-a-tutor",
        "/forget-password",
        "/password-changed",
        "/privacy-policy",
        "/reset-password",
        "/sign-in",
        "/sign-up",
        "/terms-and-conditions",
        "/tutor-page",
        "/unauthorized",
        "/verify-email",
      ];

      if (!userData) {
        if (
          studentPaths.some((path) => router.pathname.startsWith(path)) &&
          !allowedPublicPaths.includes(router.pathname)
        ) {
          await router.push("/sign-in");
        } else if (
          teacherPaths.some((path) => router.pathname.startsWith(path)) &&
          !allowedPublicPaths.includes(router.pathname)
        ) {
          await router.push("/sign-in");
        }
      } else {
        if (allowedPublicPaths.includes(router.pathname)) {
          //allow access
        } else {
          const allowedRoles = ["student", "teacher"];

          if (
            (userData?.roles?.[0]?.value === "student" &&
              !studentPaths.some((path) => router.pathname.startsWith(path))) ||
            (userData?.roles?.[0]?.value === "student" &&
              userData?.student_setup_status < 4 &&
              router.pathname.startsWith(studentPaths[0]))
          ) {
            await router.push("/unauthorized");
          } else if (
            (userData?.roles?.[0]?.value === "teacher" &&
              !teacherPaths.some((path) => router.pathname.startsWith(path))) ||
            (userData?.roles?.[0]?.value === "teacher" &&
              userData?.teacher_setup_status < 6 &&
              router.pathname.startsWith(teacherPaths[0]))
          ) {
            await router.push("/unauthorized");
          }
        }
      }

      setLoading(false);
    };

    if (router.isReady) {
      checkAccess();
    }
  }, [router.isReady, router.pathname]);

  return <>{loading ? <Loader /> : children}</>;
};

export default CustomAuthProvider;
