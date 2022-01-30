import {createLocalVue, shallowMount} from "@vue/test-utils";
import Counter from "@/Counter";
import Vuex from "vuex";


function mountComponent(mockCount) {
  const mockVue = createLocalVue();
  mockVue.use(Vuex);
  const mockStore = {
    state: {count: mockCount},
    getters: {
      getCount: mockCount
    }
  }
  return shallowMount(Counter, {
    mockVue,
    mocks: {
      $store: mockStore
    }
  })
}

describe("Counter.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountComponent(0)
  })
  describe("exist checks", () => {
    it('should component exist', function () {
      expect(wrapper.exists()).toBeTruthy()
    })

    it('should render increase and decrease buttons', function () {
      const buttons = wrapper.findAll("button")
      expect(buttons.at(0).text()).toEqual("Decrease")
      expect(buttons.at(1).text()).toEqual("Increase")
    })
  })

  describe("functionality check", () => {
    it('should call increase dispatch when click increase button', function () {
      const mock = jest.fn()
      const localThis = {
        $store: {
          dispatch: mock
        }
      }
      Counter.methods.increase.call(localThis)
      expect(mock).toHaveBeenCalledWith("increment")
    })

    it('should decrease count when click decrease button', function () {
      const mock = jest.fn()
      const localThis = {
        $store: {
          dispatch: mock
        }
      }
      Counter.methods.decrease.call(localThis)
      expect(mock).toHaveBeenCalledWith("decrement")
    })

    it('should increase 2 times and decrease 1 time when clicked buttons', function () {
      const mock = jest.fn()
      const localThis = {
        $store: {
          dispatch: mock
        }
      }
      Counter.methods.increase.call(localThis)
      Counter.methods.increase.call(localThis)
      expect(mock).toHaveBeenCalledWith("increment")

      Counter.methods.decrease.call(localThis)
      expect(mock).toHaveBeenCalledWith("decrement")

      expect(mock).toHaveBeenCalledTimes(3)
    })
  })

  describe("should show count text correctly according to count", () => {
    it('should render 10k', function () {
      wrapper = mountComponent(10)
      const span = wrapper.find("span")
      expect(span.text()).toEqual("10k")
    });

    it('should render 20k', function () {
      wrapper = mountComponent(20)
      const span = wrapper.find("span")
      expect(span.text()).toEqual("20k")
    });
  })



  // it('should component exist', function () {
  //   expect(wrapper.exists()).toBeTruthy()
  // });
  //
  // it('should Counter exist', function () {
  //   const counter = wrapper.findComponent(Counter)
  //   expect(counter.exists()).toBeTruthy()
  // });
  //
  // it('should render h1', function () {
  //   const h1 = wrapper.findComponent("h1")
  //   expect(h1.exists()).toBeTruthy()
  // });
  //
  // it('should render h1 text as Daily Corona Cases in Turkey', function () {
  //   const h1 = wrapper.find("h1")
  //   expect(h1.text()).toEqual("Daily Corona Cases in Turkey")
  // });
  //
  // describe('should render notificationArea in different classes according to Count', () => {
  //   let notificationArea
  //   it("should be safe with a value fewer than 5", function () {
  //     wrapper = mountComponent(0)
  //     notificationArea = wrapper.find("div.notificationArea")
  //     expect(notificationArea.classes()).toEqual(["notificationArea", "safe"])
  //   })
  //   it("should be normal with a value between 5 and 10", function () {
  //     wrapper = mountComponent(7)
  //     notificationArea = wrapper.find("div.notificationArea")
  //     expect(notificationArea.classes()).toEqual(["notificationArea", "normal"])
  //   })
  //   it("should be danger with a value bigger than 10", function () {
  //     wrapper = mountComponent(15)
  //     notificationArea = wrapper.find("div.notificationArea")
  //     expect(notificationArea.classes()).toEqual(["notificationArea", "danger"])
  //   });
  // })
  //
  // describe('should render notificationArea text different according to Count', () => {
  //   let notificationArea
  //   it("should be safe with a value fewer than 5", function () {
  //     const count = 0
  //     wrapper = mountComponent(count)
  //     notificationArea = wrapper.find("div.notificationArea")
  //     const localThis = {
  //       $store: {
  //         state: {
  //           count
  //         }
  //       }
  //     }
  //     expect(notificationArea.text()).toEqual(App.computed.message.call(localThis))
  //   })
  //   it("should be normal with a value between 5 and 10", function () {
  //     const count = 7
  //     wrapper = mountComponent(count)
  //     const localThis = {
  //       $store: {
  //         state: {
  //           count
  //         }
  //       }
  //     }
  //     notificationArea = wrapper.find("div.notificationArea")
  //     expect(notificationArea.text()).toEqual(App.computed.message.call(localThis))
  //   })
  //   it("should be danger with a value bigger than 10", function () {
  //     const count = 15
  //     wrapper = mountComponent(count)
  //     notificationArea = wrapper.find("div.notificationArea")
  //     const localThis = {
  //       $store: {
  //         state: {
  //           count
  //         }
  //       }
  //     }
  //     expect(notificationArea.text()).toEqual(App.computed.message.call(localThis))
  //   });
  // })
})
