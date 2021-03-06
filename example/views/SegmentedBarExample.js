// SegmentedBarExample.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Image, ScrollView, Switch} from 'react-native';

import {Theme, NavigationPage, ListRow, Label, SegmentedBar, PullPicker, Carousel, TabView} from 'teaset';
import SelectRow from './SelectRow';

export default class SegmentedBarExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'SegmentedBar',
    showBackButton: true,
  };

  constructor(props) {
    super(props);

    this.barItems = [
      'Apple',
      'Banana',
      'Cherry',
      'Durian',
    ];
    this.barScrollItems = [
      'Apple',
      'Banana',
      'Cherry',
      'Durian',
      'Filbert',
      'Grape',
      'Hickory',
      'Lemon',
      'Mango',
    ];
    this.barCustomItems = ['Home', 'Store', 'Me'];

    this.justifyItemItems = ['fixed', 'scrollable'];
    this.indicatorTypeItems = ['none', 'boxWidth', 'itemWidth'];
    this.indicatorPositionItems = ['top', 'bottom'];

    Object.assign(this.state, {
      justifyItem: 'fixed',
      indicatorType: 'itemWidth',
      indicatorPosition: 'bottom',
      animated: true,
      autoScroll: true,
      activeIndex: 0,
      custom: false,
    });
  }

  onSegmentedBarChange(index) {
    if (index != this.state.activeIndex) {
      this.setState({activeIndex: index});
      if (this.refs.carousel) {
        this._ignoreCarouselChange = setTimeout(() => {
          this._ignoreCarouselChange = null;
        }, 300);
        this.refs.carousel.scrollToPage(index);
      }
    }
  }

  onCarouselChange(index) {
    if (this._ignoreCarouselChange) return;
    this.setState({activeIndex: index});
  }

  renderCustomItems() {
    let icons = [
      require('../icons/home.png'),
      require('../icons/store.png'),
      require('../icons/me.png'),
    ];
    let activeIcons = [
      require('../icons/home_active.png'),
      require('../icons/store_active.png'),
      require('../icons/me_active.png'),
    ];
    let {activeIndex} = this.state;
    return this.barCustomItems.map((item, index) => (
      <View key={index} style={{padding: 8}} pointerEvents='none'>
        <TabView.Button title={item} icon={icons[index]} activeIcon={activeIcons[index]} active={activeIndex == index} />
      </View>
    ));
  }

  renderPage() {
    let {justifyItem, indicatorType, indicatorPosition, animated, autoScroll, custom, activeIndex} = this.state;
    let barItems = custom ? this.barCustomItems : (justifyItem == 'scrollable' ? this.barScrollItems : this.barItems);
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <SegmentedBar
          justifyItem={justifyItem}
          indicatorType={indicatorType}
          indicatorPosition={indicatorPosition}
          animated={animated}
          autoScroll={autoScroll}
          activeIndex={activeIndex}
          onChange={index => this.onSegmentedBarChange(index)}
        >
          {custom ? this.renderCustomItems() : barItems.map((item, index) => <SegmentedBar.Item key={'item' + index} title={item} />)}
        </SegmentedBar>
        <Carousel
          style={{backgroundColor: Theme.defaultColor, height: 238, borderTopWidth: 1, borderTopColor: Theme.pageColor}}
          carousel={false}
          startIndex={activeIndex}
          cycle={false}
          ref='carousel'
          onChange={index => this.onCarouselChange(index)}
        >
          {barItems.map((item, index) => (
            <View key={'view' + index} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Label type='detail' size='xl' text={item} />
            </View>
          ))}
        </Carousel>
        <View style={{height: 20}} />
        <SelectRow
          title='Justify item'
          value={justifyItem}
          items={this.justifyItemItems}
          onSelected={(item, index) => this.setState({justifyItem: item})}
          topSeparator='full'
          />
        <SelectRow
          title='Indicator type'
          value={indicatorType}
          items={this.indicatorTypeItems}
          onSelected={(item, index) => this.setState({indicatorType: item})}
          />
        <SelectRow
          title='Indicator position'
          value={indicatorPosition}
          items={this.indicatorPositionItems}
          onSelected={(item, index) => this.setState({indicatorPosition: item})}
          />
        <ListRow
          title='Animated'
          detail={<Switch value={animated} onValueChange={value => this.setState({animated: value})} />}
          />
        <ListRow
          title='Auto scroll (scrollable only)'
          detail={<Switch value={autoScroll} onValueChange={value => this.setState({autoScroll: value})} />}
          bottomSeparator='full'
          />
        <View style={{height: 20}} />
        <ListRow
          title='Custom'
          detail={<Switch value={custom} onValueChange={value => this.setState({custom: value})} />}
          topSeparator='full'
          bottomSeparator='full'
          />
      </ScrollView>
    );
  }

}
