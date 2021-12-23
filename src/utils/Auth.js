import superagent from 'superagent';
import Config from './Config';
class Auth {
    isLoggedIn (callback) {
        //console.log(localStorage.getItem('jwt'));
        if (localStorage.getItem('jwt')) {
            superagent
                .get(Config.API.URL+'/user/self')
                .set('x-access-jwt', localStorage.getItem('jwt'))
                .set('Accept', 'application/json')
                .end((err, res) => {
                    //console.log(res.body);
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, Object.assign({}, res.body, {jwt: localStorage.getItem('jwt')}));
                    }
                });
        } else {
            callback(null, null);
        }
    }
} 

export default new Auth();