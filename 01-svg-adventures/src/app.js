const zones = [
  {
    id: 'zone-a',
    name: 'Zone A',
    currentLoad: 100, // Current load
    capacity: 100, // Max capacity
  },
  {
    id: 'zone-b',
    name: 'Zone B',
    currentLoad: 25,
    capacity: 100,
  },
  {
    id: 'zone-c',
    name: 'Zone C',
    currentLoad: Math.floor(Math.random() * 101),
    capacity: 100,
  },
];

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');

  initZonesAndTooltip();
});

function initZonesAndTooltip() {
  const zoneEls = document.querySelectorAll('.zone');

  zoneEls.forEach((zoneEl) => {
    // Map zone info with svg plan
    const zone = zones.find((z) => z.id === zoneEl.id);
    zoneEl.dataset.name = zone.name;
    zoneEl.dataset.currentLoad = zone.currentLoad;
    zoneEl.dataset.capacity = zone.capacity;

    const isFull = zone.currentLoad === zone.capacity;
    const isAlmostFull = zone.currentLoad >= zone.capacity * 0.75;

    // Add class to zone element
    zoneEl.classList.add(
      isFull ? 'full' : isAlmostFull ? 'warning' : 'all-good'
    );

    // Show tooltip on mouse enter
    zoneEl.addEventListener('mouseenter', onMouseEnterZone);

    // Hide tooltip on mouse leave
    zoneEl.addEventListener('mouseleave', onMouseLeaveZone);
  });
}

function onMouseEnterZone(e) {
  const zoneTooltipEl = document.getElementById('zone-tooltip');
  const zoneEl = e.target;

  zoneTooltipEl.classList.add('active');

  // Set position
  const boundingRect = zoneEl.getBoundingClientRect();

  // Though it's center now, but css will translate it to the
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
  containersEl.textContent = zoneEl.dataset.currentLoad;

  const capacityEl = zoneTooltipEl.querySelector(
    '.zone-tooltip__capacity > span'
  );
  capacityEl.textContent = zoneEl.dataset.capacity;
}

function onMouseLeaveZone() {
  const zoneTooltipEl = document.getElementById('zone-tooltip');
  zoneTooltipEl.classList.remove('active');
}
