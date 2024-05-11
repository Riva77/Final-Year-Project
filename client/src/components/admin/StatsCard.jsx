const StatsCard = ({ title, stat }) => {
  return (
    <article class="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6 w-64">
      <div>
        <p class="text-sm text-gray-500">{title}</p>

        <p class="text-2xl font-medium text-gray-900">{stat}</p>
      </div>
    </article>
  );
};

export default StatsCard;
