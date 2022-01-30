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
    it('should increase count when click increase button', function () {
      const increaseButton = wrapper.findAll("button").at(1)
      increaseButton.click()
    })

    it('should decrease count when click decrease button', function () {
      const decreaseButton = wrapper.findAll("button").at(0)
    })
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
