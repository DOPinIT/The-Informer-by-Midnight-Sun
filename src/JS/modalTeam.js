const openModalTeamBtn = document.querySelector('[data-modal-team-open]');
const modalTeam = document.querySelector('[data-modal-team]');
const closeModalTeamBtn = document.querySelector('[data-modal-team-close]');

const onModalOpenBtnClick = () => {
  modalTeam.classList.remove('is-hidden');
  document.addEventListener('keydown', onEscKeyDown);
  modalTeam.addEventListener('click', onBackdropClick);
};

const closeModal = () => {
  modalTeam.classList.add('is-hidden');

  document.removeEventListener('keydown', onEscKeyDown);
  modalTeam.removeEventListener('click', onBackdropClick);
};

const onEscKeyDown = e => {
  if (e.code === 'Escape') {
    closeModal();
  }
};

const onBackdropClick = e => {
  const { target, currentTarget } = e;

  if (target === currentTarget) {
    closeModal();
  }
};

openModalTeamBtn.addEventListener('click', onModalOpenBtnClick);
closeModalTeamBtn.addEventListener('click', closeModal);
