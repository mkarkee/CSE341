exports.get404 = (req,res,net) => {
    res.status(404).render('pages/404', {pageTitle: 'Page Not Found', path:'/'});
}