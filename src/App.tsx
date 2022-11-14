import React, { useCallback, useState } from 'react'
import { Button } from './lib/components/Button/Button'
import { Main } from './lib/features/Main/Main'
import { ExampleImageSrc } from './lib/statics/ExampleProductImage/ExampleProductImage'
// prettier-ignore
function App() {

  const [showModal, setShowModal] = useState<boolean>(false)

  const buttonOnClickHandler = useCallback(() => {
    setShowModal(true)
  }, [setShowModal])

  return (
    <div className="App">
      <Button label='Buy me!' onClick={buttonOnClickHandler} />
      {showModal &&
        <Main
          productId={'123456'}
          price={45.99}
          currency={'€'}
          title={'Example title'}
          description={'Example description'}
          image={ExampleImageSrc}
          imageAlt='Example image alt'
          onModalClose={() => setShowModal(false)}
        />
      }
    </div>
  );
}

export default App
