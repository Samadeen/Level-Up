const arrow = document.querySelector('.arrow');
const panel_body = document.querySelector('.panel_body');
const cancel = document.querySelector('.cancel');
const alert = document.querySelector('.alert');
const profile_details = document.querySelector('.profile_details');
const dropdown = document.querySelector('.dropdown');

arrow.addEventListener('click', () => {
  if (panel_body.style.display === 'none' || panel_body.style.display === '') {
    panel_body.style.display = 'block';
    arrow.style.transform = 'rotate(180deg)';
  } else {
    panel_body.style.display = 'none';
    arrow.style.transform = 'rotate(0)';
  }
});

profile_details.addEventListener('click', () => {
  if (dropdown.style.display === 'none' || dropdown.style.display === '') {
    dropdown.style.display = 'flex';
  } else {
    dropdown.style.display = 'none';
  }
});

cancel.addEventListener('click', () => {
  alert.style.display = 'none';
});

function updateProgress() {
  const activeAccordions = document.querySelectorAll('.checked.count');
  const totalCount = activeAccordions.length;
  const accordions = document.querySelectorAll('.panel_capsule');
  const progressBar = document.getElementById('indicator');
  const progressText = document.getElementById('progressText');

  let completedCount = 0;
  const totalItems = accordions.length;

  completedCount = totalCount;
  console.log(completedCount);

  const percentage = (completedCount / totalItems) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.textContent = `${completedCount} / ${totalItems} completed`;
  console.log(completedCount, percentage, totalItems);
}

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
      checked.classList.remove('count');
      // Listen for the transitionend event
      checked.addEventListener(
        'transitionend',
        () => {
          // Update progress after the transition has ended
          updateProgress();
        },
        { once: true }
      ); // { once: true } ensures the event listener is removed after execution
    } else {
      // Otherwise, proceed with the animation to the checked state
      filled.style.transform = 'scale(0)';
      filled.style.opacity = '0';

      half.style.transform = 'scale(1) rotate(360deg)';
      half.style.opacity = '1';

      half.addEventListener(
        'transitionend',
        () => {
          // Update progress after the transition has ended
          checked.style.opacity = '1';
          half.style.opacity = '0';
          checked.classList.add('count');
          updateProgress();
        },
        { once: true }
      ); // { once: true } ensures the event listener is removed after execution
    }
  });
}

// Query all SVG containers and iterate through them
const svgContainers = document.querySelectorAll('.svg-container');

svgContainers.forEach((container) => {
  handleSVGInteraction(container);
});

document.addEventListener('DOMContentLoaded', function () {
  const accordions = document.querySelectorAll('.panel_capsule');

  accordions.forEach((accordion) => {
    const title = accordion.querySelector('h2');

    const checkIcon = accordion.querySelector('.checked');

    checkIcon.addEventListener('click', function () {
      if (!accordion.classList.contains('checked')) {
        toggleAccordion(accordion);
        setTimeout(() => updateProgress(), 200); // Add a small delay using setTimeout
      }
    });

    title.addEventListener('click', function () {
      toggleAccordion(accordion);
    });
  });
});

function toggleAccordion(panelCapsule) {
  const elementsToToggle = panelCapsule.querySelectorAll('.hide');
  elementsToToggle.forEach((element) => {
    if (window.getComputedStyle(element).display === 'none') {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });

  const isActive = panelCapsule.dataset.active === 'true';

  // Only toggle the 'checked' class if the accordion is not active
  if (!isActive) {
    panelCapsule.classList.toggle('checked');
  }

  const allAccordions = document.querySelectorAll('.panel_capsule');
  allAccordions.forEach((accordion) => {
    const isCurrentAccordion = accordion === panelCapsule;
    accordion.dataset.active = isCurrentAccordion ? 'true' : 'false';

    if (!isCurrentAccordion) {
      accordion.querySelectorAll('.hide').forEach((element) => {
        element.style.display = 'none';
      });
      accordion.classList.remove('checked');
    }
  });
}
