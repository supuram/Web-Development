function toggleSubMenu(menuId) {
    var submenu = document.getElementById(menuId);
    if (submenu.style.display === 'block') {
      submenu.style.display = 'none';
    } else {
      submenu.style.display = 'block';
    }
}  