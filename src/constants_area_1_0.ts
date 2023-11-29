import { DIRECTIONS, ENTITY_STATUSES } from './types';

export const area_1_0 = {
  tileMap: {
    '1,0': {
      type: 'edge_corner_inside_br',
    },
    '2,0': {
      type: 'edge_b',
    },
    '3,0': {
      type: 'edge_b',
    },
    '4,0': {
      type: 'edge_b',
    },
    '5,0': {
      type: 'edge_corner_inside_bl',
    },
    '1,1': {
      type: 'edge_r',
    },
    '1,2': {
      type: 'edge_r',
    },
    '1,3': {
      type: 'edge_r',
    },
    '1,4': {
      type: 'edge_r',
    },

    '5,1': {
      type: 'edge_l',
    },
    '5,2': {
      type: 'edge_l_br',
    },
    '5,3': {
      type: 'edge_cap_down',
    },

    '6,2': {
      type: 'edge_b',
    },
    '7,2': {
      type: 'edge_b',
    },
    '8,2': {
      type: 'edge_b',
    },
    '9,2': {
      type: 'edge_corner_inside_bl',
    },

    '2,1': {
      type: 'wall1t',
    },
    '3,1': {
      type: 'wall2t',
    },
    '4,1': {
      type: 'wall3t',
    },
    '2,2': {
      type: 'wall1b',
    },
    '3,2': {
      type: 'wall2b',
    },
    '4,2': {
      type: 'wall3b',
    },

    '5,4': {
      type: 'wall1t',
    },
    '5,5': {
      type: 'wall1b',
    },

    '6,3': {
      type: 'wall1t',
    },
    '7,3': {
      type: 'wall2t',
    },
    '8,3': {
      type: 'wall3t',
    },
    '6,4': {
      type: 'wall1b',
    },
    '7,4': {
      type: 'stairs_up_n',
    },
    '8,4': {
      type: 'wall3b',
    },

    '9,3': {
      type: 'edge_l',
    },
    '9,4': {
      type: 'edge_l',
    },
    '9,5': {
      type: 'edge_bl',
    },
    '9,6': {
      type: 'wall1t',
    },
    '9,7': {
      type: 'wall1b',
    },
    '9,9': {
      type: 'edge_tl',
    },
    '1,5': {
      type: 'edge_br',
    },
    '1,6': {
      type: 'wall2t',
    },
    '1,7': {
      type: 'wall2b',
    },
    '0,5': {
      type: 'edge_corner_inside_br',
    },
    '0,6': {
      type: 'edge_r',
    },
    '0,7': {
      type: 'edge_r',
    },
    '0,8': {
      type: 'passage_e',
      actionValue: '22_8_0',
    },
    '0,9': {
      type: 'edge_r',
    },
    '0,10': {
      type: 'edge_r',
    },
    '9,10': {
      type: 'edge_l',
    },

    '4,7': {
      type: 'edge_top',
    },
    '4,8': {
      type: 'wall3b',
    },
    '4,9': {
      type: 'floor2',
      overlay: 'shadow_tf',
    },

    '2,3': {
      type: 'floor1',
      overlay: 'shadow_tl',
    },
    '3,3': {
      type: 'floor1',
      overlay: 'shadow_t',
    },
    '4,3': {
      type: 'floor1',
      overlay: 'shadow_t',
    },

    '2,4': {
      type: 'floor2',
      overlay: 'shadow_l',
    },
    '3,4': {
      type: 'floor1',
    },
    '4,4': {
      type: 'floor1',
    },

    '2,5': {
      type: 'floor1',
      overlay: 'shadow_l',
    },
    '3,5': {
      type: 'floor1',
    },
    '4,5': {
      type: 'floor1',
    },

    '6,5': {
      type: 'floor1',
      overlay: 'shadow_tl',
    },
    '7,5': {
      type: 'floor1',
      overlay: 'shadow_t',
    },
    '8,5': {
      type: 'floor1',
      overlay: 'shadow_t',
    },

    '2,6': {
      type: 'floor1',
      overlay: 'shadow_l',
    },
    '3,6': {
      type: 'floor1',
    },
    '4,6': {
      type: 'floor1',
    },
    '5,6': {
      type: 'floor1',
      overlay: 'shadow_tf',
    },
    '6,6': {
      type: 'floor3',
      overlay: 'shadow_tl_corner',
    },
    '7,6': {
      type: 'floor1',
    },
    '8,6': {
      type: 'floor1',
    },

    '2,7': {
      type: 'floor1',
      overlay: 'shadow_l',
    },
    '3,7': {
      type: 'floor1',
    },
    '5,7': {
      type: 'floor1',
    },
    '6,7': {
      type: 'floor1',
    },
    '7,7': {
      type: 'floor1',
    },
    '8,7': {
      type: 'floor1',
    },

    '1,8': {
      type: 'floor1',
      overlay: 'shadow_tf',
    },
    '2,8': {
      type: 'floor1',
      overlay: 'shadow_tl_corner',
    },
    '3,8': {
      type: 'floor1',
    },
    '5,8': {
      type: 'floor1',
      overlay: 'shadow_lf',
    },
    '6,8': {
      type: 'floor1',
    },
    '7,8': {
      type: 'floor1',
    },
    '8,8': {
      type: 'floor1',
    },

    '1,9': {
      type: 'floor1',
      overlay: 'shadow_lf',
    },
    '2,9': {
      type: 'floor1',
    },
    '3,9': {
      type: 'floor1',
    },
    '5,9': {
      type: 'floor1',
      overlay: 'shadow_tl_corner',
    },
    '6,9': {
      type: 'floor1',
    },
    '7,9': {
      type: 'floor1',
    },
    '8,9': {
      type: 'floor1',
    },

    '1,10': {
      type: 'floor1',
      overlay: 'shadow_l',
    },
    '2,10': {
      type: 'floor1',
    },
    '3,10': {
      type: 'floor1',
    },
    '4,10': {
      type: 'floor1',
    },
    '5,10': {
      type: 'floor1',
    },
    '6,10': {
      type: 'floor1',
    },
    '7,10': {
      type: 'floor1',
    },
    '8,10': {
      type: 'floor1',
    },

    '6,11': {
      type: 'floor1',
      overlay: 'shadow_lf',
    },
    '7,11': {
      type: 'floor1',
    },
    '5,11': {
      type: 'edge_tr',
    },
    '8,11': {
      type: 'edge_tl',
    },

    '9,11': {
      type: 'edge_corner_inside_tl',
    },

    '6,12': {
      type: 'floor1',
      overlay: 'shadow_l',
    },
    '7,12': {
      type: 'floor3',
    },
    '6,13': {
      type: 'floor1',
      overlay: 'shadow_l',
    },
    '7,13': {
      type: 'floor1',
    },
    '5,14': {
      type: 'edge_corner_inside_tr',
    },
    '8,14': {
      type: 'edge_corner_inside_tl',
    },
    '6,14': {
      type: 'edge_t',
    },
    '7,14': {
      type: 'edge_t',
    },

    '8,12': {
      type: 'edge_l',
    },
    '8,13': {
      type: 'edge_l',
    },
    '5,12': {
      type: 'edge_r',
    },
    '5,13': {
      type: 'edge_r',
    },

    '4,11': {
      type: 'edge_t',
    },
    '1,11': {
      type: 'edge_t',
    },
    '2,11': {
      type: 'edge_t',
    },
    '3,11': {
      type: 'edge_t',
    },
    '0,11': {
      type: 'edge_corner_inside_tr',
    },

    '9,8': {
      type: 'floor1',
      overlay: 'shadow_tf',
    },
    '10,8': {
      type: 'floor2',
      overlay: 'shadow_t',
    },
    '11,8': {
      type: 'floor1',
      overlay: 'shadow_t',
    },
    '12,8': {
      type: 'floor1',
      overlay: 'shadow_t',
    },
    '13,8': {
      type: 'floor1',
      overlay: 'shadow_t',
    },

    '10,5': {
      type: 'edge_b',
    },
    '11,5': {
      type: 'edge_b',
    },
    '12,5': {
      type: 'edge_b',
    },
    '13,5': {
      type: 'edge_br',
    },
    '13,9': {
      type: 'edge_tr',
    },

    '10,6': {
      type: 'wall2t',
    },
    '11,6': {
      type: 'wall3t',
    },
    '12,6': {
      type: 'wall1t',
    },
    '13,6': {
      type: 'wall2t',
    },
    '10,7': {
      type: 'wall2b',
    },
    '11,7': {
      type: 'wall3b',
    },
    '12,7': {
      type: 'wall1b',
    },
    '13,7': {
      type: 'wall2b',
    },
    '10,9': {
      type: 'edge_t',
    },
    '11,9': {
      type: 'edge_t',
    },
    '12,9': {
      type: 'edge_t',
    },
    '13,10': {
      type: 'edge_r',
    },
    '13,11': {
      type: 'edge_r',
    },
    '13,4': {
      type: 'edge_r',
    },
    '13,3': {
      type: 'edge_r',
    },
    '14,2': {
      type: 'edge_b',
    },
    '15,2': {
      type: 'edge_b',
    },
    '16,2': {
      type: 'edge_b',
    },
    '17,2': {
      type: 'edge_b',
    },
    '18,2': {
      type: 'edge_b',
    },
    '19,2': {
      type: 'edge_b',
    },
    '14,12': {
      type: 'edge_t',
    },
    '15,12': {
      type: 'edge_t',
    },
    '16,12': {
      type: 'edge_t',
    },
    '17,12': {
      type: 'edge_t',
    },
    '18,12': {
      type: 'edge_t',
    },
    '19,12': {
      type: 'edge_t',
    },
    '20,11': {
      type: 'edge_tl',
    },
    '20,12': {
      type: 'edge_corner_outside_tl',
    },
    '21,10': {
      type: 'edge_tl',
    },
    '21,11': {
      type: 'edge_corner_outside_tl',
    },
    '22,9': {
      type: 'edge_tl',
    },
    '22,10': {
      type: 'edge_corner_outside_tl',
    },
    '23,9': {
      type: 'edge_corner_outside_tl',
    },
    '23,8': {
      type: 'passage_w',
      // overlay: 'shadow_t',
      actionValue: '1_8_0',
    },
    '23,7': {
      type: 'edge_l',
    },
    '23,6': {
      type: 'edge_l',
    },
    '20,3': {
      type: 'edge_bl',
    },
    '20,2': {
      type: 'edge_corner_outside_bl',
    },
    '21,4': {
      type: 'edge_bl',
    },
    '21,3': {
      type: 'edge_corner_outside_bl',
    },
    '22,5': {
      type: 'edge_bl',
    },
    '22,4': {
      type: 'edge_corner_outside_bl',
    },
    '23,5': {
      type: 'edge_corner_outside_bl',
    },
    '13,2': {
      type: 'edge_corner_outside_br',
    },
    '13,12': {
      type: 'edge_corner_outside_tr',
    },
    '14,3': {
      type: 'wall1t',
    },
    '14,4': {
      type: 'wall1b',
    },
    '15,3': {
      type: 'wall2t',
    },
    '15,4': {
      type: 'wall2b',
    },
    '16,3': {
      type: 'wall3t',
    },
    '16,4': {
      type: 'wall3b',
    },
    '17,3': {
      type: 'wall1t',
    },
    '17,4': {
      type: 'wall1b',
    },
    '18,3': {
      type: 'wall2t',
    },
    '18,4': {
      type: 'wall2b',
    },
    '19,3': {
      type: 'wall3t',
    },
    '19,4': {
      type: 'wall3b',
    },
    '20,4': {
      type: 'wall1t',
    },
    '20,5': {
      type: 'wall1b',
    },
    '21,5': {
      type: 'wall1t',
    },
    '21,6': {
      type: 'wall1b',
    },
    '22,6': {
      type: 'wall1t',
    },
    '22,7': {
      type: 'wall1b',
    },
    '14,5': {
      type: 'floor1',
      overlay: 'shadow_tl',
    },
    '14,6': {
      type: 'floor1',
      overlay: 'shadow_l',
    },
    '14,7': {
      type: 'floor1',
      overlay: 'shadow_l',
    },
    '14,8': {
      type: 'floor1',
      overlay: 'shadow_tl_corner',
    },
    '14,9': {
      type: 'floor1',
      overlay: 'shadow_lf',
    },
    '14,10': {
      type: 'floor1',
      overlay: 'shadow_l',
    },
    '14,11': {
      type: 'floor1',
      overlay: 'shadow_l',
    },
    '15,5': {
      type: 'floor1',
      overlay: 'shadow_t',
    },
    '15,6': {
      type: 'floor2',
    },
    '15,7': {
      type: 'floor1',
    },
    '15,8': {
      type: 'floor1',
    },
    '15,9': {
      type: 'floor1',
    },
    '15,10': {
      type: 'floor1',
    },
    '15,11': {
      type: 'floor1',
    },
    '16,5': {
      type: 'floor1',
      overlay: 'shadow_t',
    },
    '16,6': {
      type: 'floor1',
    },
    '16,7': {
      type: 'floor1',
    },
    '16,8': {
      type: 'floor1',
    },
    '16,9': {
      type: 'floor1',
    },
    '16,10': {
      type: 'floor1',
    },
    '16,11': {
      type: 'floor1',
    },
    '17,5': {
      type: 'floor1',
      overlay: 'shadow_t',
    },
    '17,6': {
      type: 'floor1',
    },
    '17,7': {
      type: 'edge_top',
    },
    '17,8': {
      type: 'wall1b',
    },
    '17,9': {
      type: 'floor1',
      overlay: 'shadow_tf',
    },
    '17,10': {
      type: 'floor1',
    },
    '17,11': {
      type: 'floor1',
    },
    '18,5': {
      type: 'floor1',
      overlay: 'shadow_t',
    },
    '18,6': {
      type: 'floor1',
    },
    '18,7': {
      type: 'floor1',
    },
    '18,8': {
      type: 'floor1',
      overlay: 'shadow_lf',
    },
    '18,9': {
      type: 'floor1',
      overlay: 'shadow_tl_corner',
    },
    '18,10': {
      type: 'floor1',
    },
    '18,11': {
      type: 'floor1',
    },
    '19,5': {
      type: 'floor1',
      overlay: 'shadow_t',
    },
    '19,6': {
      type: 'floor1',
    },
    '19,7': {
      type: 'floor1',
    },
    '19,8': {
      type: 'floor1',
    },
    '19,9': {
      type: 'floor1',
    },
    '19,10': {
      type: 'floor2',
    },
    '19,11': {
      type: 'floor1',
    },
    '20,6': {
      type: 'floor1',
      overlay: 'shadow_tf',
    },
    '20,7': {
      type: 'floor1',
    },
    '20,8': {
      type: 'floor1',
    },
    '20,9': {
      type: 'floor1',
    },
    '20,10': {
      type: 'floor1',
    },
    '21,7': {
      type: 'floor3',
      overlay: 'shadow_tf',
    },
    '21,8': {
      type: 'floor1',
    },
    '21,9': {
      type: 'floor1',
    },
    '22,8': {
      type: 'floor1',
      overlay: 'shadow_tf',
    },
  },
  entities: [
    {
      id: 'tree-1',
      type: 'plant',
      direction: DIRECTIONS.NONE,
      position: {
        x: 15,
        y: 9,
      },
    },
    {
      id: 'tree-2',
      type: 'plant',
      direction: DIRECTIONS.NONE,
      position: {
        x: 3,
        y: 5,
      },
    },
  ],
};
