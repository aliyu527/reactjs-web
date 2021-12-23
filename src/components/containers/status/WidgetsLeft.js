import React, { Component, lazy, Suspense } from 'react';
import Loading from '../../presentation/Loading';
const Promotion = lazy(() => import('../../presentation/widgets/Promotion'));
//const Weather   = lazy(() => import('../../presentation/widgets/Weather'));
class WidgetsLeft extends Component {
    render () {
        return (
            <aside class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-12 col-12 d-none d-sm-none d-md-none d-lg-none d-xl-block">
                <Suspense fallback={<Loading />}>
                    {/*<Weather />*/}
                    <Promotion />
                </Suspense>
            </aside>
        )
    }
}

export default WidgetsLeft;