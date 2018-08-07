'use strict';

describe('ase.details: DetailsTabs', function () {

    beforeEach(module('ase.mock.resources'));
    beforeEach(module('ase.mock.resources.grout'));
    beforeEach(module('ase.templates'));
    beforeEach(module('ase.details'));

    var $compile;
    var $httpBackend;
    var $rootScope;
    var GroutResourcesMock;
    var ResourcesMock;

    beforeEach(inject(function (_$compile_, _$httpBackend_, _$rootScope_,
                               _GroutResourcesMock_, _ResourcesMock_) {
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        GroutResourcesMock = _GroutResourcesMock_;
        ResourcesMock = _ResourcesMock_;
    }));

    it('should render tabs item', function () {
        var scope = $rootScope.$new();
        scope.record = GroutResourcesMock.RecordResponse.results[0];
        scope.recordSchema = ResourcesMock.RecordSchemaResponse.results[0];

        var recordUrl = /api\/records\//;
        $httpBackend.expectGET(recordUrl).respond(200, GroutResourcesMock.RecordResponse.results[0]);

        var element = $compile('<ase-details-tabs ' +
                               'record-schema="recordSchema" record="record" user-can-write="true">' +
                               '</ase-details-tabs>')(scope);
        $rootScope.$apply();

        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();

        expect(element.find('.tab-content').length).toEqual(1);
    });
});
