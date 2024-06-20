const Loader = () => {
  return (
    <section className="loader">
      <div></div>
    </section>
  );
};

export default Loader;

export const SkeletonLoader = ({ length = 3 }) => {
  const skeletons = Array.from({ length }, (_, idx) => (
    <div key={idx} className="shape"></div>
  ));
  return <div className="skeleton-loader">{skeletons}</div>;
};
