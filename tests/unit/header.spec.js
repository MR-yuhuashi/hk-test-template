import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Header from '../../src/components/header/index.vue';
import sinon from 'sinon';

describe('Header.vue', () => {
  it('renders correct text', () => {
      const wrapper = shallowMount(Header);

      expect(wrapper.text()).to.include('Header');

      expect(wrapper.vm.msg).to.equal('Header');

  });

  it('renders correct state', () => {
      const wrapper = shallowMount(Header);

      expect(wrapper.vm.msg).to.equal('Header');

      wrapper.setData({ msg: 'New Header' });
      
      expect(wrapper.vm.msg).to.equal('New Header');
  });

  it('trigger button method', () => {
      const wrapper = shallowMount(Header);

      const clickMethodStub = sinon.stub()
      wrapper.setMethods({ clickMethod: clickMethodStub })

      wrapper.find('button').trigger('click')

      expect(clickMethodStub.called).to.equal(true)

  });
});