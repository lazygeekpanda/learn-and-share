const zones = [
  {
    id: 'zone-a',
    name: 'Zone A',
    containers: 100,
    capacity: 100,
  },
  {
    id: 'zone-b',
    name: 'Zone B',
    containers: 100,
    capacity: 100,
  },
  {
    id: 'zone-c',
    name: 'Zone C',
    containers: 20,
    capacity: 100,
  },
];

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');

  const zoneEls = document.querySelectorAll('.zone');
  const zoneTooltipEl = document.getElementById('zone-tooltip');

  zoneEls.forEach((zoneEl) => {
    // Map zone info with svg plan
    const zone = zones.find((z) => z.id === zoneEl.id);
    zoneEl.dataset.name = zone.name;
    zoneEl.dataset.containers = zone.containers;
    zoneEl.dataset.capacity = zone.capacity;

    const isFull = zone.containers === zone.capacity;
    const isAlmostFull = zone.containers >= zone.capacity * 0.75;

    // Add class to zone element
    zoneEl.classList.add(
      isFull ? 'full' : isAlmostFull ? 'warning' : 'all-good'
    );

    // Show tooltip on hover
    zoneEl.addEventListener('mouseenter', function () {
      zoneTooltipEl.classList.add('active');

      // Set position
      const boundingRect = zoneEl.getBoundingClientRect();

      const xpos = boundingRect.left + boundingRect.width / 2;
      const ypos = boundingRect.top + boundingRect.height / 2;

      zoneTooltipEl.style.left = `${xpos}px`;
      zoneTooltipEl.style.top = `${ypos}px`;

      // Set tooltip content
      const titleEl = zoneTooltipEl.querySelector('h4');
      titleEl.textContent = zoneEl.dataset.name;

      const containersEl = zoneTooltipEl.querySelector(
        '.zone-tooltip__containers > span'
      );
      containersEl.textContent = zoneEl.dataset.containers;

      const capacityEl = zoneTooltipEl.querySelector(
        '.zone-tooltip__capacity > span'
      );
      capacityEl.textContent = zoneEl.dataset.capacity;
    });

    // Hide tooltip on mouse leave
    zoneEl.addEventListener('mouseleave', function () {
      zoneTooltipEl.classList.remove('active');
    });
  });
});
