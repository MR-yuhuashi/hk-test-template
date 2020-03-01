import { shallowMount } from '@vue/test-utils';
import Header from '../../src/components/header/index.vue';
import sinon from 'sinon';

describe('Header.vue', () => {
  test('renders correct text', () => {
      const wrapper = shallowMount(Header);

      expect(wrapper.text()).toMatch('Header');

      expect(wrapper.vm.msg).toBe('Header');

  });

  test('renders correct state', () => {
      const wrapper = shallowMount(Header);

      expect(wrapper.vm.msg).toBe('Header');

      wrapper.setData({ msg: 'New Header' });
      
      expect(wrapper.vm.msg).toBe('New Header');
  });

  test('trigger button method', () => {
      const wrapper = shallowMount(Header);

      const clickMethodStub = sinon.stub()
      wrapper.setMethods({ clickMethod: clickMethodStub })

      wrapper.find('button').trigger('click')

      expect(clickMethodStub.called).toBe(true)

  });
});