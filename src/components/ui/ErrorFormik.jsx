export default function ErrorFormik({ isTouched, isError, error }) {
    return (
      <>
        {isError && isTouched ? (
          <div
            className={`text-red-500 text-custom-20 font-custom-500 mt-2`}
          >
            {error}
          </div>
        ) : null}
      </>
    );
  }
  