import React, { Component, lazy, Suspense } from 'react';
import Loading from '../../presentation/Loading';
const PeopleSuggestions = lazy(() => import('../../presentation/widgets/PeopleSuggestions'));

class WidgetsRight extends Component {
    render () {
        return (
            <aside class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-12 col-12 d-none d-sm-none d-md-none d-lg-none d-xl-block">
                <Suspense fallback={<Loading />}>
                    <PeopleSuggestions />
                </Suspense>
            </aside>
        )
    }
}

export default WidgetsRight;