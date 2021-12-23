import superagent from 'superagent';
import jsonp from 'superagent-jsonp';

export default {
    get: (url, params, callback) => {
        superagent
            .get(url)
            .use(jsonp)
            .query(params)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, res.body);
                }
            });
    },
    post: (url, body, callback) => {
        superagent
            .post(url)
            .send(body)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, res.body);
                }
            })
    },
    put: () => {

    },
    delete: () => {

    }
}