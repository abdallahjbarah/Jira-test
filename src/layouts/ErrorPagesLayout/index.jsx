import MainButtonLink from "@components/ui/MainButtonLink";
import PublicLayout from "@layouts/PublicLayout";

export default function ErrorPagesLayout({
  title,
  subTitle,
  image,
  hasRedirectButton = true,
  path = "/",
}) {
  return (
    <PublicLayout isFooter={false}>
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="text-center mb-10">
          <div className="text-grayscale_1 text-custom-6xl leading-custom-80 font-custom-semi-bold mb-8">
            {title}
          </div>
          <div className="text-grayscale_2 text-custom-xl leading-custom-30 font-custom-medium mb-8">
            {subTitle}
          </div>
        </div>
        <div className="imageContainer">{image}</div>

        {/* {hasRedirectButton && (
          <MainButtonLink
            path={path}
            text={"Take me home"}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 16L18 6M18 6H7.25M18 6V16.75"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        )} */}
      </div>
    </PublicLayout>
  );
}
