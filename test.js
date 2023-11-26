function handleSVGInteraction(sectionContainer) {
  const filled = sectionContainer.querySelector('.filled');
  const half = sectionContainer.querySelector('.half');
  const checked = sectionContainer.querySelector('.checked');

  sectionContainer.addEventListener('mouseover', () => {
    filled.style.opacity = '1';
  });

  sectionContainer.addEventListener('mouseout', () => {
    filled.style.opacity = '0';
  });

  sectionContainer.addEventListener('click', () => {
    if (checked.style.opacity === '1') {
      // If checked is visible, revert back to the initial state
      filled.style.transform = 'scale(1)';
      filled.style.opacity = '1';

      half.style.transform = 'scale(0)';
      half.style.opacity = '0';

      checked.style.opacity = '0';
    } else {
      // Otherwise, proceed with the animation to the checked state
      filled.style.transform = 'scale(0)';
      filled.style.opacity = '0';

      half.style.transform = 'scale(1) rotate(360deg)';
      half.style.opacity = '1';

      setTimeout(() => {
        half.style.transform = 'scale(0)'; // Rotate by 180 degrees
        checked.style.opacity = '1';
      }, 500);
    }
  });
}

// Query all SVG containers and iterate through them
const svgContainers = document.querySelectorAll('.svg-container');

svgContainers.forEach((container) => {
  handleSVGInteraction(container);
});

const accordions = document.querySelectorAll('.panel_capsule');

accordions.forEach((accordion) => {
  const details = accordion.querySelector('.panel_capsule_details');
  const panelDetail = accordion.querySelector('.panel_capsule_detail');

  panelDetail.addEventListener('click', () => {
    // Toggle the hide class to show/hide additional elements
    const elementsToToggle = accordion.querySelectorAll('.hide');
    elementsToToggle.forEach((element) => element.classList.toggle('hide'));

    // Toggle the checked class to control the visibility of details
    accordion.classList.toggle('checked');

    // Close other accordions
    accordions.forEach((otherAccordion) => {
      if (otherAccordion !== accordion) {
        otherAccordion
          .querySelector('.panel_capsule_details')
          .classList.add('hide');
        otherAccordion.classList.remove('checked');
      }
    });
  });
});

console.log('object');
