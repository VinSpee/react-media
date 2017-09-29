import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import Media from '../Media'

const createMockMediaMatcher = (matches) => () => ({
  matches,
  addListener: () => {},
  removeListener: () => {}
})

describe('A <Media>', () => {
  let originalMatchMedia
  beforeEach(() => {
    originalMatchMedia = window.matchMedia
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  let node
  beforeEach(() => {
    node = document.createElement('div')
  })

  describe('with a query that matches', () => {
    beforeEach(() => {
      window.matchMedia = createMockMediaMatcher(true)
    })

    describe('and a children element', () => {
      it('renders its child', () => {
        const element = (
          <Media query="">
            <div>hello</div>
          </Media>
        )

        ReactDOM.render(element, node, () => {
          expect(node.firstChild.innerHTML).toMatch(/hello/)
        })
      })
    })

    describe('and a children function', () => {
      it('renders its child', () => {
        const element = (
          <Media query="">
            {matches => (
              matches ? <div>hello</div> : <div>goodbye</div>
            )}
          </Media>
        )

        ReactDOM.render(element, node, () => {
          expect(node.firstChild.innerHTML).toMatch(/hello/)
        })
      })
    })

    describe('and a render function', () => {
      it('renders its child', () => {
        const element = (
          <Media query="" render={() => (
            <div>hello</div>
          )}/>
        )

        ReactDOM.render(element, node, () => {
          expect(node.firstChild.innerHTML).toMatch(/hello/)
        })
      })
    })

    describe('and an object query', () => {
      it('renders its child', () => {
        const query = { maxWidth: window.innerWidth }
        const element = (
          <Media query={query} render={() => (
            <div>hello</div>
          )}/>
        )

        render(element, node, () => {
          expect(node.firstChild.innerHTML).toMatch(/hello/)
        })
      })
    })

    describe('and a queries object', () => {
      it('renders its child', () => {
        const queries = { 
          sm: {
            maxWidth: window.innerWidth,
          },
        }
        const element = (
          <Media queries={queries} render={() => (
            <div>hello</div>
          )}/>
        )

        render(element, node, () => {
          expect(node.firstChild.innerHTML).toMatch(/hello/)
        })
      })

      it('passes matches for each key', () => {
        const queries = { 
          sm: {
            maxWidth: window.innerWidth,
          },
          md: {
            maxWidth: window.innerWidth - 1,
          },
        }
        const element = (
          <Media queries={queries}>
            {({ sm, md }) => (
              <div>
                {md && 'goodbye'}
                {sm && 'hello'}
              </div>
            )}
          </Media>
        )

        render(element, node, () => {
          expect(node.firstChild.innerHTML).toMatch(/hello/)
        })
      })
    })
  })

  describe('with a query that does not match', () => {
    beforeEach(() => {
      window.matchMedia = createMockMediaMatcher(false)
    })

    describe('and a children element', () => {
      it('renders its child', () => {
        const element = (
          <Media query="">
            <div>hello</div>
          </Media>
        )

        ReactDOM.render(element, node, () => {
          expect(node.firstChild.innerHTML || '').not.toMatch(/hello/)
        })
      })
    })

    describe('and a children function', () => {
      it('renders its child', () => {
        const element = (
          <Media query="">
            {matches => (
              matches ? <div>hello</div> : <div>goodbye</div>
            )}
          </Media>
        )

        ReactDOM.render(element, node, () => {
          expect(node.firstChild.innerHTML).toMatch(/goodbye/)
        })
      })
    })

    describe('and a render function', () => {
      it('does not render', () => {
        let renderWasCalled = false
        const element = (
          <Media query="" render={() => {
            renderWasCalled = true
            return <div>hello</div>
          }}/>
        )

        ReactDOM.render(element, node, () => {
          expect(node.firstChild.innerHTML || '').not.toMatch(/hello/)
          expect(renderWasCalled).toBe(false)
        })
      })
    })
  })

  describe('rendered on the server', () => {
    beforeEach(() => {
      window.matchMedia = createMockMediaMatcher(true)
    })

    it('renders its child', () => {
      const markup = ReactDOMServer.renderToStaticMarkup(
        <Media query="">
          <div>hello</div>
        </Media>
      )

      expect(markup).toMatch(/hello/)
    })
  })
})
