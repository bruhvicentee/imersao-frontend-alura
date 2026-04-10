const index = Number(localStorage.getItem('profileIndex'))
const profiles = JSON.parse(localStorage.getItem('profiles'))
const profile = profiles[index]


function save() {
}


function cancel() {
  window.location.href = '../../index.html'
}


function remove() {
  const confirmDelete = confirm('Tem certeza que deseja excluir?')

  if (!confirmDelete) return

  profiles.splice(index, 1)

  localStorage.setItem('profiles', JSON.stringify(profiles))

  window.location.href = '../../index.html'
}
