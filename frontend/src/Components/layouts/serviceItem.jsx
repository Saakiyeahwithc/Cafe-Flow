function ServiceItem(props) {
  const { label, value, icon } = props;
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-gray-700">{label}</span>
      </div>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}

export default ServiceItem